pipeline {
    agent any
    options { timeout(time: 5) }
    parameters {
        booleanParam(name: 'PROMOTE_ON_PRODUCTION', defaultValue: false,
            description: 'Al termine di questa pipeline, vuoi consentire la promozione in ambiente di Produzione?')
    }
    environment {                    
        PACKAGE_FILE_NAME = "cerepro.hr.fe.rjs" ;
        ARTIFACT_FILE_NAME = "centauri"
        ARTIFACT_FILE_EXTENSION = ".tar"              
        APPLICATION_DOCKER_HOST = "rastaban"
        DEV_SERVICES_EXPOSED_PORT="9060"
        STAGE_SERVICES_EXPOSED_PORT="9061"
        PROD_SERVICES_EXPOSED_PORT="9062"
        DOCKER_HOST_CONTAINER_NAME_PREFIX="${PACKAGE_FILE_NAME}"
        DEV_info_app_environment_PROPERTY="DEV"
        STAGE_info_app_environment_PROPERTY="STAGE"
        PROD_info_app_environment_PROPERTY="PROD"        
    }
    stages {   
        stage ("PREPARE AND DELIVERY FOR DEVELOPMENT ENVIRONMENT --> DOCKERIZED") {
            environment {
                ENV = "dev"
                SERVICES_EXPOSED_PORT = "${DEV_SERVICES_EXPOSED_PORT}" 
                ARTIFACT_FULL_FILE_NAME = "${ARTIFACT_FILE_NAME}_${ENV}${ARTIFACT_FILE_EXTENSION}"
            }
            steps {
                echo "ready to download dependencies"
	            sh "npm install && npm audit fix"
	            echo "ready to build optimized build"
	            sh "npm run build"
	            sh "cd build && tar -cvf ${ARTIFACT_FULL_FILE_NAME} ."
	            sh "cp ./build/${ARTIFACT_FULL_FILE_NAME} ."
	            archiveArtifacts artifacts: "${ARTIFACT_FULL_FILE_NAME}", onlyIfSuccessful: true
                archiveArtifacts artifacts: "Dockerfile", onlyIfSuccessful: true
	            /*
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./Dockerfile ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "MOVING files on docker host"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./${ARTIFACT_FULL_FILE_NAME}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                echo "EXECUTING DEV ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER}"
                */
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
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER}"
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
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER}"
            }
        }
        */
    }
    post {
		always {
			mail to: 'm.franco@proximanetwork.it',
			subject: "Completed Pipeline: ${currentBuild.fullDisplayName}",
			body: "Your build completed, please check: ${env.BUILD_URL}"
		}
	}
}