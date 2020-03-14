interface editData_Type {
    title: string,
    type: number,
    goal: number,
    options?: string | string[],
    answer: string | string[],
    analysis: string,
    music_src?: string,
    creatorId: number,
    createTime: string,
    problemId?: number,
    answerNum: number,
    labels: string,
    diffculty: number,
    achivementRate: number,
    usedNum: number,
    linkProblemIds?: string,
    linkListenId: number
}
interface FileList {
    uid: number,
    name: string,
    status: string,
    url: string
}
interface State {
    queryData: {
        problemId: number,
        creatorId: number,
        type: number,
        diffculty: number
    },
    editData: editData_Type,
    tableData: any[],
    dialogVisible: boolean,
    dialogTitle: string,
    loading: boolean,
    fileList: FileList[]
}

export { State, editData_Type, FileList };