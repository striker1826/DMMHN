export const KakaoLoginResponse = {
  created: {
    schema: {
      properties: {
        access_token: {
          type: 'string',
          description: '발급된 access_token',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0IiwiaWF0IjoxNzE3MjIzMjU4LCJleHAiOjE3MTczMDk2NTh9.2_hRj5fyPFktSCr3gpEH6t-3Y6pkvFQOW9v6SXAKvPE',
        },
        refresh_token: {
          type: 'string',
          description: '발급된 refresh_toekn',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0IiwiaWF0IjoxNzE3MjIzMjU4LCJleHAiOjE3MTc4MjgwNTh9.m_bsJ5D_7h0f0G2RRYgTb9-ZvkYTatjC5W6z3Yl7zZY',
        },
      },
    },
  },
  unAuthorized: {
    description: '올바른 인증코드가 아닙니다.',
  },
};
