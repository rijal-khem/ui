pipeline {
    agent any
    stages {

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

            steps {
                script {
                    def plan = readFile 'tfplan.txt'
                    input message: "Do you want to apply the plan?",
                        parameters: [text(name: 'Plan', description: 'Please review the plan', defaultValue: plan)]
                }
            }
        }

        stage('Apply') {
            steps {
                sh "terraform apply -input=false tfplan"
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'tfplan.txt'
        }
    }
}