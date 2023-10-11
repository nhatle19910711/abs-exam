export interface IAnswers {
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    e?: string;
}


export interface IQuestion {
    title: string;

    answers: IAnswers;

    answer: string;

    category: string;
}

export interface IUpdateQuestion extends Partial<IQuestion> {
    title?: string;

    answers?: IAnswers;

    answer?: string;

    category?: string;
}