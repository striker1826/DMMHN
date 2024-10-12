import { ApiProperty } from '@nestjs/swagger';

export class OverallRatingInputDto {
  @ApiProperty({
    name: 'evaluation',
    type: 'string',
    example: `"good": "답변자는 호이스팅의 기본 개념을 잘 설명했습니다. 특히, 호이스팅이 식별자들을 위로 끌어올리는 것처럼 보인다는 점을 언급하여 개념을 이해하기 쉽게 설명했습니다.", "bad": "호이스팅의 구체적인 작동 방식이나 변수와 함수 선언의 차이점에 대한 설명이 부족합니다. 예를 들어, 변수 선언의 경우 var, let, const에 따라 호이스팅의 동작이 어떻게 달라지는지, 함수 선언과 함수 표현식의 차이점 등을 추가로 설명하면 좋겠습니다."`,
  })
  evaluation: string;
}
