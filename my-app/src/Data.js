export const fakeNumericOptions = [
    { label: '1', value: 50 },
    { label: '2', value: 20 },
    { label: '3', value: 10 },
    { label: '4', value: 10 },
    { label: '5', value: 10 },
];

export const fakeCategoryOptions = [
    { label: 'A', value: 0 },
    { label: 'B', value: 0 },
    { label: 'C', value: 0 },
    { label: 'D', value: 0 },
    { label: 'E', value: 0 },
];

export const fakeEvaluationA = {
    id: 1,
    questions: [
        { id: 1, question: "item 1", type: "score", options: [...fakeNumericOptions] },
        { id: 2, question: "item 2", type: "score", options: [...fakeCategoryOptions] },
        // { id: 3, question: "item 3", options: [1,2,3,4,5] },
        // { id: 4, question: "item 4", options: [1,2,3,4,5] },
        // { id: 5, question: "item 5", options: [1,2,3,4,5] },
        // { id: 6, question: "item 6", options: [1,2,3,4,5] },
    ],
};

export const fakeEvaluationB = {
    id: 2,
    questions: [
        { id: 7, question: "item A", type: "score", options: [...fakeNumericOptions] },
        { id: 8, question: "item B", type: "score", options: [...fakeCategoryOptions] },
        { id: 9, question: "item C", type: "free" },
        // { id: 10, question: "item D", options: [1,2,3,4,5] },
        // { id: 11, question: "item E", options: [1,2,3,4,5] },
        // { id: 12, question: "item F", options: [1,2,3,4,5] },
    ],
};

export const fakeEvaluationC = {
    id: 3,
    questions: [
        { id: 13, question: "item i", options: [1,2,3,4,5] },
        { id: 14, question: "item ii", options: [1,2,3,4,5] },
        { id: 15, question: "item iii", options: [1,2,3,4,5] },
        // { id: 16, question: "item iv", options: [1,2,3,4,5] },
        // { id: 17, question: "item v", options: [1,2,3,4,5] },
        // { id: 18, question: "item vi", options: [1,2,3,4,5] },
    ],
};

export const fakeCategories = [
    { id: 1, name: "Category A", rules: "Do magna aliqua duis magna laborum eu esse ex sit ipsum occaecat. Reprehenderit deserunt amet eiusmod laboris consectetur commodo mollit duis laborum fugiat. Voluptate cillum nisi consectetur pariatur non duis ullamco quis id Lorem velit aute consectetur. Esse voluptate magna velit aliqua anim nisi.", evaluation: { ...fakeEvaluationA } },
    { id: 2, name: "Category B", rules: "Ex irure occaecat adipisicing labore mollit id. Reprehenderit qui laboris elit non deserunt. Laboris incididunt occaecat exercitation excepteur magna occaecat id proident qui aute reprehenderit proident minim. Cupidatat enim est nulla enim minim labore mollit commodo deserunt laboris eu fugiat. Ea consectetur irure enim cillum nisi cillum incididunt proident.", evaluation: { ...fakeEvaluationB } },
    // { id: 3, name: "Category C", rules: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum", evaluation: { ...fakeEvaluationC } },
];

export const fakeContestants = [
    {
        id: 1,
        name: "Test 1",
        city: "Santiago, Chile",
        description: "Voluptate officia officia dolor est consequat non minim do ex qui aliquip incididunt fugiat. Reprehenderit ad velit nisi do quis fugiat aute voluptate nostrud ad. Velit incididunt aliqua consectetur laboris.",
        image: "https://via.placeholder.com/240x300",
        status: 3,
    },
    {
        id: 2,
        name: "Test 2",
        city: "Santiago, Chile",
        description: "Voluptate officia officia dolor est consequat non minim do ex qui aliquip incididunt fugiat. Reprehenderit ad velit nisi do quis fugiat aute voluptate nostrud ad. Velit incididunt aliqua consectetur laboris.",
        image: "https://via.placeholder.com/240x300",
        status: 3,
    },
    {
        id: 3,
        name: "Test 3",
        city: "Santiago, Chile",
        description: "Voluptate officia officia dolor est consequat non minim do ex qui aliquip incididunt fugiat. Reprehenderit ad velit nisi do quis fugiat aute voluptate nostrud ad. Velit incididunt aliqua consectetur laboris.",
        image: "https://via.placeholder.com/240x300",
        status: 3,
    },
];

export const fakeSponsors = [
    { id: 1, name: "Sponsor 1", description: "Lorem ipsum", image: "https://via.placeholder.com/200x100" },
    { id: 2, name: "Sponsor 2", description: "Lorem ipsum", image: "https://via.placeholder.com/200x100" },
    { id: 3, name: "Sponsor 3", description: "Lorem ipsum", image: "https://via.placeholder.com/200x100" },
    { id: 4, name: "Sponsor 4", description: "Lorem ipsum", image: "https://via.placeholder.com/200x100" },
];

export const fakeCompetition = {
    id: 1,
    name: "Competition 1",
    date: "2022-09-01",
    place: "Test place",
    status: 1,
    logo: "https://via.placeholder.com/100x100",
    categories: [...fakeCategories],
    sponsors: [...fakeSponsors],
    contestants: [...fakeContestants],
};

export const fakeResults = [
    {
        id_contestant: 1,
        categories: [
            {
                id: 1,
                questions: [
                    { id_question: 1, mean_score: 80 },
                    { id_question: 2, mean_score: 90 },
                    { id_question: 3, mean_score: 70 },
                ]
            },
            // {
            //     id: 2,
            //     questions: [
            //         { id_question: 7, mean_score: 80}
            //     ]
            // },
        ],
    },
    {
        id_contestant: 2,
        categories: [
            {
                id: 1,
                questions: [
                    { id_question: 1, mean_score: 40 },
                    { id_question: 2, mean_score: 50 },
                    { id_question: 3, mean_score: 50 },
                ]
            },
        ],
    },
    {
        id_contestant: 3,
        categories: [
            {
                id: 1,
                questions: [
                    { id_question: 1, mean_score: 70 },
                    { id_question: 2, mean_score: 50 },
                    { id_question: 3, mean_score: 60 },
                ]
            },
        ],
    },
    
];

export const fakeResults2 = [
   {
        question: "item 1",
        type: "score",
        contestants: [
            { contestant: "Test 1", mean_score: 80 },
            { contestant: "Test 2", mean_score: 50 },
            { contestant: "Test 3", mean_score: 10 },
        ],
    },
    {
        question: "item 2",
        type: "score",
        contestants: [
            { contestant: "Test 1", mean_score: 90 },
            { contestant: "Test 2", mean_score: 40 },
            { contestant: "Test 3", mean_score: 70 },
        ],
    },
    {
        question: "item 3",
        type: "score",
        contestants: [
            { contestant: "Test 1", mean_score: 70 },
            { contestant: "Test 2", mean_score: 30 },
            { contestant: "Test 3", mean_score: 70 },
        ],
    },
    {
        question: "item 4",
        type: "free",
        contestants: [
            { contestant: "Test 1", answers: "Ex cillum anim est in sint laborum do amet amet. Cillum mollit incididunt duis cupidatat aute occaecat laboris dolor consectetur. In eu laborum est fugiat aliqua qui veniam. Duis reprehenderit fugiat qui occaecat est est occaecat reprehenderit eiusmod dolore duis amet. Aute nisi irure mollit velit. Do Lorem sint sunt et tempor sunt pariatur." },
            { contestant: "Test 2", answers: "Ex cillum anim est in sint laborum do amet amet. Cillum mollit incididunt duis cupidatat aute occaecat laboris dolor consectetur. In eu laborum est fugiat aliqua qui veniam. Duis reprehenderit fugiat qui occaecat est est occaecat reprehenderit eiusmod dolore duis amet. Aute nisi irure mollit velit. Do Lorem sint sunt et tempor sunt pariatur." },
            { contestant: "Test 3", answers: "Ex cillum anim est in sint laborum do amet amet. Cillum mollit incididunt duis cupidatat aute occaecat laboris dolor consectetur. In eu laborum est fugiat aliqua qui veniam. Duis reprehenderit fugiat qui occaecat est est occaecat reprehenderit eiusmod dolore duis amet. Aute nisi irure mollit velit. Do Lorem sint sunt et tempor sunt pariatur." },
        ],
    },
    {
        question: "item 5",
        type: "free",
        contestants: [
            { contestant: "Test 1", answers: "Ex cillum anim est in sint laborum do amet amet. Cillum mollit incididunt duis cupidatat aute occaecat laboris dolor consectetur. In eu laborum est fugiat aliqua qui veniam. Duis reprehenderit fugiat qui occaecat est est occaecat reprehenderit eiusmod dolore duis amet. Aute nisi irure mollit velit. Do Lorem sint sunt et tempor sunt pariatur." },
            { contestant: "Test 2", answers: "Ex cillum anim est in sint laborum do amet amet. Cillum mollit incididunt duis cupidatat aute occaecat laboris dolor consectetur. In eu laborum est fugiat aliqua qui veniam. Duis reprehenderit fugiat qui occaecat est est occaecat reprehenderit eiusmod dolore duis amet. Aute nisi irure mollit velit. Do Lorem sint sunt et tempor sunt pariatur." },
            { contestant: "Test 3", answers: "Ex cillum anim est in sint laborum do amet amet. Cillum mollit incididunt duis cupidatat aute occaecat laboris dolor consectetur. In eu laborum est fugiat aliqua qui veniam. Duis reprehenderit fugiat qui occaecat est est occaecat reprehenderit eiusmod dolore duis amet. Aute nisi irure mollit velit. Do Lorem sint sunt et tempor sunt pariatur." },
        ],
    },
];