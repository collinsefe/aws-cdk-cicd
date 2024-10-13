import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'AweSomePipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('collinsefe/aws-cdk-cicd', 'cicd-practice'),
        commands: [
          'pwd',
          'ls -la',
          // 'terraform init'
          'npm ci',
          'npx cdk synth'
        ],
        // primaryOutputDirectory: 'cdk-cicd/cdk.out'

      })
    })

  }
}
