pipeline {    
    agent { 
	    label 'Locale-Master-Node' 
	    
	}	
	tools {nodejs "nodeJs_18.15.0"}
	
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
                sh "echo 'current user: '$USER"
                sh "printenv"
                echo "ready to download dependencies"
                sh "npm install -g npm@9.6.2"
                sh "npm -v"
                sh "node -v"
                sh "npm cache clean --force"
                sh "npm config set legacy-peer-deps true"                
                sh "npm install"
	            echo "preparing .env"
	            sh "rm .env && cp .env.DEV .env"
	            echo "preparing env.js"
	            sh "rm ./src/env.js && cp ./src/env.js.DEV ./src/env.js"
	            echo "ready to build optimized build"
	            sh "npm run build"
	            sh "cd build && rm -Rf cancv && rm -Rf canimg && rm -Rf cansurv && tar -cvf ${ARTIFACT_FULL_FILE_NAME} ."
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
        stage ("BUILD AND ARCHIVE STAGE ARTIFACT") {
            environment {
                ENV = "stage"
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "ready to download dependencies"
                sh "npm -v"
                sh "node -v"
                sh "npm install"
	            echo "preparing .env"
	            sh "rm .env && cp .env.STAGE .env"
	            echo "preparing env.js"
	            sh "rm ./src/env.js && cp ./src/env.js.STAGE ./src/env.js"
	            echo "ready to build optimized build"
	            sh "npm run build"
	            sh "cd build && rm -Rf cancv && rm -Rf canimg && rm -Rf cansurv && tar -cvf ${ARTIFACT_FULL_FILE_NAME} ."
	            sh "cp ./build/${ARTIFACT_FULL_FILE_NAME} ."
	            archiveArtifacts artifacts: "${ARTIFACT_FULL_FILE_NAME}", onlyIfSuccessful: true
                archiveArtifacts artifacts: "Dockerfile", onlyIfSuccessful: true
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
                ENV = "stage"
                SERVICES_EXPOSED_PORT = "${STAGE_SERVICES_EXPOSED_PORT}" 
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "EXECUTING ${ENV} ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT} ${REMOTE_WORKING_DIR} ${ARTIFACT_FULL_FILE_NAME}"	            
            }
        }        
        stage ("BUILD AND ARCHIVE PRODUCTION ARTIFACT") {
            when { expression { return params.PROMOTE_ON_PRODUCTION } }
            environment {
                ENV = "prod"
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "ready to download dependencies"
                sh "npm -v"
                sh "node -v"
                sh "npm install"
	            echo "preparing .env"
	            sh "rm .env && cp .env.PROD .env"
	            echo "preparing env.js"
	            sh "rm ./src/env.js && cp ./src/env.js.PROD ./src/env.js"
	            echo "ready to build optimized build"
	            sh "npm run build"
	            sh "cd build && rm -Rf cancv && rm -Rf canimg && rm -Rf cansurv && tar -cvf ${ARTIFACT_FULL_FILE_NAME} ."
	            sh "cp ./build/${ARTIFACT_FULL_FILE_NAME} ."
	            archiveArtifacts artifacts: "${ARTIFACT_FULL_FILE_NAME}", onlyIfSuccessful: true
                archiveArtifacts artifacts: "Dockerfile", onlyIfSuccessful: true
            }
        }     
        stage ("DEPLOY PRODUCTION ARTIFACT") {
            when { expression { return params.PROMOTE_ON_PRODUCTION } }
            environment {
                ENV = "prod"
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
	            echo "MOVING files on docker host"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources/${REMOTE_WORKING_DIR} ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources/${REMOTE_WORKING_DIR} ${APPLICATION_DOCKER_HOST} ${ENV}"	            
            }
        }
        stage ("DELIVERY PRODUCTION ARTIFACT") {
            when { expression { return params.PROMOTE_ON_PRODUCTION } }
            environment {
                ENV = "prod"
                SERVICES_EXPOSED_PORT = "${PROD_SERVICES_EXPOSED_PORT}" 
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}_${BUILD_NUMBER}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "EXECUTING ${ENV} ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT} ${REMOTE_WORKING_DIR} ${ARTIFACT_FULL_FILE_NAME}"	            
            }
        }   
        
    }
    post {
		always {
			emailext body: 'Completed Pipeline: ${JOB_BASE_NAME}. \n Your build completed, please check: ${BUILD_URL}', 
				recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
					[$class: 'RequesterRecipientProvider']], 
					subject: 'Completed Pipeline: ${JOB_BASE_NAME} - build number: ${BUILD_ID} '
		}
	}
}