import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep, CodeBuildStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';
import { Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { PipelineStage } from './PipelineStage';


export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   // Define artifacts for source and build stages
   const sourceArtifact = new Artifact();
   const buildArtifact = new Artifact();


    const pipeline = new CodePipeline(this, 'AweSomePipeline', {
      pipelineName: 'NonProd-Pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('collinsefe/aws-cdk-cicd', 'cicd-practice'),
        commands: [
          'pwd',
          'ls -la',
          'npm ci',
          'npx cdk synth'
        ],
        // primaryOutputDirectory: 'cdk-cicd/cdk.out'

      })
    });
  const teststage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
    stageName: 'Test'
  }))

  teststage.addPre(new CodeBuildStep('unit-tests', {
    commands: [
      'npm ci',
      'npm test'
    ]
  }))

  const stagingstage = pipeline.addStage(new PipelineStage(this, 'PipelineStagingStage', {
    stageName: 'Staging'
  }))  

  
  //  // Add a manual approval step before deploying to Staging
  //  pipeline.stage('Staging').addAction(new ManualApprovalAction({
  //   actionName: 'ManualApprovalBeforeStaging',
  //   runOrder: 1 // Ensure it's the first action in the stage
  // }));

  // new ManualApprovalAction({
  //   actionName: 'ManualApprovalBeforeProduction',
  //   notificationTopic: mySnsTopic,  // Notify users via SNS
  //   externalEntityLink: 'https://my-internal-review-system.example.com'
  // });


  // // Add the final Production stage
  // const productionstage = pipeline.addStage(new PipelineStage(this, 'PipelineProductionStage', {
  //   stageName: 'Production'
  // }));

  // // Add a manual approval step before deploying to Production
  // pipeline.stage('Production').addAction(new ManualApprovalAction({
  //   actionName: 'ManualApprovalBeforeProduction',
  //   runOrder: 1
  // }));

}}