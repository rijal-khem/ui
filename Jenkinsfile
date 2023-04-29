    pipeline {
        agent any
        stages {

            stage('Git checkout') {

               steps {
                 git 'https://github.com/rijal-khem/ui.git'
                 git checkout
               }

             }

            stage('TF-Init') {
                    steps {
                        sh 'terraform init'
                    }
            }

            stage('TF-Validate') {
                    steps {
                        sh 'terraform validate'
                    }

            }

            stage('Plan') {
                    steps {
                        sh 'terraform plan'
                        sh 'terraform show -no-color tfplan > tfplan.txt'
                    }
            }

            stage('Apply') {
                    steps {
                        sh 'terraform apply'
                    }
            }
        }

    }