import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';
import { aws_codepipeline_actions } from 'aws-cdk-lib'
// import { iam, Arn } from 'aws-cdk-lib'


export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const pipeline = new CodePipeline(this, 'AweSomePipeline', {
      pipelineName: 'AwesomePipeline',
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


const approveStage = pipeline.addStage(new PipelineStage(this, 'PipelineApproveStage', { 
  stageName: 'Approve' 

}))

const manualApprovalAction = new aws_codepipeline_actions.ManualApprovalAction({
  actionName: 'Approve',
});
// approveStage.addAction(manualApprovalAction);

// const role = iam.Role.fromRoleArn(this, 'Admin', Arn.format({ service: 'iam', resource: 'role', resourceName: 'Admin' }, this));
// manualApprovalAction.grantManualApproval(role);


  const prodstage = pipeline.addStage(new PipelineStage(this, 'PipelineStagingProd', {
    stageName: 'Production'
  }))

  }
}
