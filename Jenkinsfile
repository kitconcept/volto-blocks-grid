#!groovy

pipeline {

  agent {
    label 'docker'
  }

  environment {
        GIT_NAME = "volto-blocks"
        NAMESPACE = "@kitconcept"
        DEPENDENCIES = ""
  }

  options {
    buildDiscarder(logRotator(numToKeepStr:'20'))
    skipDefaultCheckout()
    disableConcurrentBuilds()
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {
    // Static Code Analysis
    stage('ESlint') {
      steps {
        deleteDir()
        checkout scm
        sh '''docker pull plone/volto-addon-ci'''
        sh '''docker run -i --rm --name="$BUILD_TAG-eslint" -e NAMESPACE="$NAMESPACE" -e DEPENDENCIES="$DEPENDENCIES" -e GIT_NAME=$GIT_NAME -v $(pwd):/opt/frontend/my-volto-project/src/addons/$GIT_NAME plone/volto-addon-ci eslint'''
      }
      post {
        always {
          recordIssues enabledForFailure: true, aggregatingResults: true, tool: esLint(pattern: 'eslint.xml')
        }
      }
    }
    stage('stylelint') {
      steps {
        deleteDir()
        checkout scm
        sh '''docker pull plone/volto-addon-ci'''
        sh '''docker run -i --rm --name="$BUILD_TAG-stylelint" -e NAMESPACE="$NAMESPACE" -e DEPENDENCIES="$DEPENDENCIES" -e GIT_NAME=$GIT_NAME -v $(pwd):/opt/frontend/my-volto-project/src/addons/$GIT_NAME plone/volto-addon-ci stylelint'''
      }
    }
    stage('Prettier') {
      steps {
        deleteDir()
        checkout scm
        sh '''docker pull plone/volto-addon-ci'''
        sh '''docker run -i --rm --name="$BUILD_TAG-prettier" -e NAMESPACE="$NAMESPACE" -e DEPENDENCIES="$DEPENDENCIES" -e GIT_NAME=$GIT_NAME -v $(pwd):/opt/frontend/my-volto-project/src/addons/$GIT_NAME plone/volto-addon-ci prettier'''
      }
    }

    stage('Unit tests') {
      steps {
        deleteDir()
        checkout scm
        sh '''docker pull plone/volto-addon-ci'''
        sh '''docker run -i --name="$BUILD_TAG-volto" -e NAMESPACE="$NAMESPACE" -e DEPENDENCIES="$DEPENDENCIES" -e GIT_NAME=$GIT_NAME -v $(pwd):/opt/frontend/my-volto-project/src/addons/$GIT_NAME plone/volto-addon-ci test'''
      }
      post {
        always {
          sh '''mkdir -p xunit-reports'''
          sh '''docker cp $BUILD_TAG-volto:/opt/frontend/my-volto-project/coverage xunit-reports/'''
          sh '''docker cp $BUILD_TAG-volto:/opt/frontend/my-volto-project/junit.xml xunit-reports/'''
          sh '''docker cp $BUILD_TAG-volto:/opt/frontend/my-volto-project/unit_tests_log.txt xunit-reports/'''
          sh '''docker rm -v $BUILD_TAG-volto'''
          step([
            $class: 'JUnitResultArchiver',
            testResults: 'xunit-reports/junit.xml'
          ])
          archiveArtifacts artifacts: 'xunit-reports/unit_tests_log.txt', fingerprint: true
          archiveArtifacts artifacts: 'xunit-reports/coverage/lcov.info', fingerprint: true
          publishHTML (target : [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'xunit-reports/coverage/lcov-report',
            reportFiles: 'index.html',
            reportName: 'UTCoverage',
            reportTitles: 'Unit Tests Code Coverage'
          ])
        }
      }
    }

    stage('Acceptance tests') {
      steps {
        deleteDir()
        checkout scm
        sh 'yarn'
        sh 'yarn ci:cypress'
        // sh '''docker pull plone; docker run -d --name="$BUILD_TAG-plone" -e SITE="Plone" -e PROFILES="profile-plone.restapi:blocks" plone fg'''
        // sh '''docker pull plone/volto-addon-ci; docker run -i --name="$BUILD_TAG-cypress" --link $BUILD_TAG-plone:plone -e NAMESPACE="$NAMESPACE" -e DEPENDENCIES="$DEPENDENCIES" -e GIT_NAME=$GIT_NAME -v $(pwd):/opt/frontend/my-volto-project/src/addons/$GIT_NAME plone/volto-addon-ci cypress'''
      }
      post {
        always {
          archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', fingerprint: true, allowEmptyArchive: true
          archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true, allowEmptyArchive: true
          junit 'results/cypress-report-*.xml'
        }
      }
      // post {
      //   always {
      //     sh '''mkdir -p cypress-reports'''
      //     sh '''docker cp $BUILD_TAG-cypress:/opt/frontend/my-volto-project/src/addons/$GIT_NAME/cypress/videos cypress-reports/'''
      //     stash name: "cypress-reports", includes: "cypress-reports/**/*"
      //     archiveArtifacts artifacts: 'cypress-reports/videos/*.mp4', fingerprint: true
      //     sh '''echo "$(docker stop $BUILD_TAG-plone; docker rm -v $BUILD_TAG-plone; docker rm -v $BUILD_TAG-cypress)" '''
      //   }
      // }
    }

  }

  post {
    success {
      slackSend (
        color: 'good',
        message: "SUCCESS: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    failure {
      slackSend (
        color: 'danger',
        message: "FAILURE: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    unstable {
      slackSend (
        color: 'warning',
        message: "UNSTABLE: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    aborted {
      slackSend (
        color: 'danger',
        message: "ABORTED: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    always {
      sh 'rm -rf node_modules *.tgz'
    }
  }
}
