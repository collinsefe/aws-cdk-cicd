import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep, CodeBuildStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


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
      })
    });
    
  // const teststage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
  //   stageName: 'Test'
  // }))

  // teststage.addPre(new CodeBuildStep('unit-tests', {
  //   commands: [
  //     'npm ci',
  //     'npm test'
  //   ]
  // }));

  // const stagingstage = pipeline.addStage(new PipelineStage(this, 'PipelineStagingStage', {
  //   stageName: 'Staging'
  // }));

  // const productionstage = pipeline.addStage(new PipelineStage(this, 'PipelineProdStage', {
  //   stageName: 'Production'
  // }));


}}