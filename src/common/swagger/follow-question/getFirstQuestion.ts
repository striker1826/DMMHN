export const getFirstQuestion = {
  ok: {
    schema: {
      properties: {
        first_question: {
          type: 'string',
          description: '첫 번째 질문',
          example: '호이스팅이란 무엇인가요?',
        },
      },
    },
    description: '질문을 성공적으로 받아 온 경우',
  },
  unAuthorized: {
    description: '로그인이 필요한 기능입니다.',
  },
  badRequest: {
    description: 'queryString에 올바른 값들을 넣었는지 확인해 주세요.',
  },
};
