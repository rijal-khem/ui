  pipeline {
    agent  any
      stages {

            stage ('Checkout GitHub'){
              steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/initial']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'jenkinsAccess', url: 'https://github.com/rijal-khem/ui.git']]])
              }
            }

            stage('terraform init') {
                 steps {
                     script {
                         sh 'terraform init -no-color'
                     }
                 }
            }

            stage('terraform Plan') {
                 steps {
                      script {
                         sh 'terraform plan -no-color -out=plan.out'
                      }
                 }
            }

            stage('Waiting for Approvals') {

                steps {
                    input('Plan Validated? Please approve to create VPC Network in AWS?')
                }
            }

            stage('terraform Apply') {

                 steps {
                        script {
                              sh 'terraform apply -no-color -auto-approve plan.out'
                              sh "terraform output"
                        }
                 }
            }
      }

    }