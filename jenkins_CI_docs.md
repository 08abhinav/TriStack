# Jenkins CI Pipeline

- **Backend:** Express.js  
- **Frontend:** Vite + React.js  
- **Database:** MongoDB Atlas (Cloud Database)

The CI pipeline is hosted on an AWS EC2 instance and performs **code checkout, security scanning, image building, and deployment using Docker Compose**.

---

# Architecture Overview

Pipeline Flow:

User → GitHub → Jenkins Pipeline → Security Scans → Build Docker Images → Push to ECR → Deploy with Docker Compose

Security and code quality checks are integrated using:
- Trivy
- Gitleaks
- SonarQube

Container images are stored in **AWS Elastic Container Registry (ECR)**.

---

# AWS EC2 Configuration

The Jenkins server runs on an EC2 instance with the following specifications:

- **AMI:** Ubuntu
- **Instance Type:** t2.medium
- **Storage:** 25 GiB

Remote connection is established using **MobaXterm**.

---

# CI Pipeline Flow

The Jenkins pipeline consists of **11 stages**, where each stage performs a specific task in the CI process.

---

## Stage 1: Git Checkout
In this stage, Jenkins pulls the source code from the GitHub repository into the Jenkins workspace.

After running the pipeline, you can verify the repository on the Jenkins server:

```bash
cd /var/lib/jenkins/workspace/CI
ls
```
You will see the application files downloaded from GitHub.

## Stage 2 and Stage 3: Backend Compile & Frontend Compile
This stage installs backend and frontend dependencies and prepares the application for further steps.

## Stage 4: Trivy File System Scan
Trivy is used to scan the repository for vulnerabilities and security issues.

It helps detect:
- OS package vulnerabilities
- Dependency vulnerabilities
- Misconfigurations

## Stage 5: Gitleaks Scan
Gitleaks scans the repository for hardcoded secrets such as:

- API keys
- Tokens
- Passwords
- Private keys
This ensures sensitive information is not accidentally committed to the repository.

## Stage 6: SonarQube Code Analysis
SonarQube performs automated code quality and security analysis.

It analyzes the code for:

- Bugs
- Security vulnerabilities
- Code smells
- Maintainability issues
- After analysis, SonarQube generates a quality report.

Note:
SonarQube requires a separate server, so a dedicated EC2 instance should be created to host the SonarQube service.

## Stage 7: Login to Amazon ECR
In this stage, Jenkins authenticates with Amazon Elastic Container Registry (ECR) to allow pushing Docker images.

Amazon ECR is a fully managed container registry used to store and manage Docker images.

## Stage 8 & Stage 9: Build and Push Backend & Frontend Image
Jenkins builds the backend  and frontend Docker image and pushes it to the ECR repository.

Steps performed:
- Build Docker image
- Tag image with ECR repository
- Push image to ECR

## Stage 10: Docker Image Storage in ECR
After both images are pushed, they are stored inside the ECR repository.

## Stage 11: Deploy using Docker Compose
In the final stage, the application is deployed using Docker Compose.

The docker-compose.yml file references the images stored in ECR.