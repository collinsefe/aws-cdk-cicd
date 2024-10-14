import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";
import { VPCStack } from "./vpc";
import { S3ObjectStack } from "./s3";
import { ECSStack } from "./ecs"

export class PipelineStage extends Stage {

    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props)

        new LambdaStack(this, 'LambdaStack', {
            stageName: props.stageName
        })

        new VPCStack(this, 'VPCStack')

        new S3ObjectStack(this, 'S3ObjectStack')

        new ECSStack(this, 'ECSStack')
    }
}