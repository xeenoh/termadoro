export interface Tag{
    id?: number; 
    name: string;
}


export interface Pomodoro {
    id?: number ; 
    start_datetime: string;
    end_datetime: string ; 
    duration: number;
}


export interface PomodoroTag{
    id?: number ; 
    tags_id: number;
    pomodoro_id: number;
}