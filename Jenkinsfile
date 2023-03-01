pipeline {
    agent any
    options { timeout(time: 1, unit: 'HOURS') }
    parameters {
        booleanParam(name: 'PROMOTE_ON_PRODUCTION', defaultValue: false,
            description: 'Al termine di questa pipeline, vuoi consentire la promozione in ambiente di Produzione?')
    }
    environment {  
        ARTIFACT_FILE_NAME = "cerepro.hr.fe.rjs" 
        REMOTE_WORKING_DIR = "${ARTIFACT_FILE_NAME}"
        ARTIFACT_FILE_EXTENSION = ".tar"              
        APPLICATION_DOCKER_HOST = "rastaban"
        SERVICE_SOURCE_PORT = "80"
        DEV_SERVICES_EXPOSED_PORT="9060"
        STAGE_SERVICES_EXPOSED_PORT="9061"
        PROD_SERVICES_EXPOSED_PORT="9062"
        DOCKER_HOST_CONTAINER_NAME_PREFIX="${ARTIFACT_FILE_NAME}"
        DEV_info_app_environment_PROPERTY="DEV"
        STAGE_info_app_environment_PROPERTY="STAGE"
        PROD_info_app_environment_PROPERTY="PROD"        
    }
    stages {   
        stage ("BUILD AND ARCHIVE DEVELOPMENT ARTIFACT") {
            environment {
                ENV = "dev"
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "ready to download dependencies"
                sh "npm -v"
                sh "node -v"
                
	            sh "npm install --force && npm audit fix"
	            echo "preparing .env"
	            sh "rm .env && cp .env.DEV .env"
	            echo "preparing env.js"
	            sh "rm ./src/env.js && cp ./src/env.js.DEV ./src/env.js"
	            echo "ready to build optimized build"
	            sh "npm run build"
	            sh "cd build && rm -Rf cancv && rm -Rf canimg && tar -cvf ${ARTIFACT_FULL_FILE_NAME} ."
	            sh "cp ./build/${ARTIFACT_FULL_FILE_NAME} ."
	            archiveArtifacts artifacts: "${ARTIFACT_FULL_FILE_NAME}", onlyIfSuccessful: true
                archiveArtifacts artifacts: "Dockerfile", onlyIfSuccessful: true
            }
        }
        stage ("DEPLOY DEVELOPMENT ARTIFACT") {
            environment {
                ENV = "dev"
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
	            echo "MOVING files on docker host"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources/${REMOTE_WORKING_DIR} ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources/${REMOTE_WORKING_DIR} ${APPLICATION_DOCKER_HOST} ${ENV}"	            
            }
        }
        stage ("DELIVERY DEVELOPMENT ARTIFACT") {
            environment {
                ENV = "dev"
                SERVICES_EXPOSED_PORT = "${DEV_SERVICES_EXPOSED_PORT}" 
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "EXECUTING ${ENV} ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT} ${REMOTE_WORKING_DIR} ${ARTIFACT_FULL_FILE_NAME}"	            
            }
        }
        stage ("DEPLOY STAGE ARTIFACT") {
            environment {
                ENV = "stage"
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
	            echo "MOVING files on docker host"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources/${REMOTE_WORKING_DIR} ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources/${REMOTE_WORKING_DIR} ${APPLICATION_DOCKER_HOST} ${ENV}"	            
            }
        }
        stage ("DELIVERY STAGE ARTIFACT") {
            environment {
                ENV = "dev"
                SERVICES_EXPOSED_PORT = "${STAGE_SERVICES_EXPOSED_PORT}" 
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "EXECUTING ${ENV} ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT} ${REMOTE_WORKING_DIR} ${ARTIFACT_FULL_FILE_NAME}"	            
            }
        }
        /*
        stage ("PREPARE AND DELIVERY FOR STAGE ENVIRONMENT --> DOCKERIZED") {
            environment {
                ENV = "stage"
                SERVICES_EXPOSED_PORT = "${STAGE_SERVICES_EXPOSED_PORT}"         
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./Dockerfile ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "MOVING files on docker host"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./${ARTIFACT_FULL_FILE_NAME}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                echo "EXECUTING DEV ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT}"
            }
        }
        stage ("PREPARE AND DELIVERY FOR PRODUCTION ENVIRONMENT --> DOCKERIZED") {
            when { expression { return params.PROMOTE_ON_PRODUCTION } }
            environment {
                ENV = "prod"         
                SERVICES_EXPOSED_PORT = "${PROD_SERVICES_EXPOSED_PORT}"
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./Dockerfile ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "MOVING files on docker host"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./${ARTIFACT_FULL_FILE_NAME}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                echo "EXECUTING DEV ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT}"
            }
        }
        */
    }
    post {
		always {
		
			emailext body: 'Completed Pipeline: ${currentBuild.fullDisplayName}. /n Your build completed, please check: ${env.BUILD_URL}', 
				recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
					[$class: 'RequesterRecipientProvider']], 
					subject: 'Completed Pipeline: ${currentBuild.fullDisplayName}'
		}
	}
}