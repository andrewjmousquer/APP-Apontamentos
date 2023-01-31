export let checkListOS = {
  id: 1,
  name: "Checklist de Entrada",
  descrition: "Descrição de exemplo checklist de entrada",
  priorityOrder: "High",
  tag: "12ab4sc",
  groups: [
    {
      ckgId: 1,
      name: "Pintura/Funilaria",
      questions: [
        {
          id: 1,
          question: "Capô",
          creationDate: new Date(),
          active: false,
          cklId: 0,
        },
        {
          id: 2,
          question: "Coluna Dianteira Esquerda",
          creationDate: new Date(),
          active: true,
          cklId: 0,
        },
        {
          id: 3,
          question: "Coluna Dianteira Direita",
          creationDate: new Date(),
          active: false,
          cklId: 0,
        },
      ],
    },
    {
      ckgId: 2,
      name: "Tapeçaria",
      questions: [
        {
          id: 1,
          question: "Teste",
          creationDate: new Date(),
          active: null,
          cklId: 0,
        },
      ],
    },
    {
      ckgId: 3,
      name: "Itens de Segurança",
      questions: [
        {
          id: 1,
          question: "Testando",
          creationDate: new Date(),
          active: null,
          cklId: 0,
        },
      ],
    },
  ],
};
