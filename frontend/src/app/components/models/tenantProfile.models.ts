export interface TenantProfile {
    age: number | null | undefined;
    occupation: string;
    gender: Gender;
    activity_schedule: ActivitySchedule;
    cleanliness_level: CleanlinessLevel;
    pets: boolean;
    smoker: boolean;
    visit_frequency: string;
    common_space_usage: CommonSpaceUsage;
    hobbies: string;
    socializing_frequency: SocializingFrequency;
    living_enviroment:LivingEnvironment;
    presentation:string;
    desiredCity:string;
}
export enum Gender {
    Male = 'Male',
    Female = 'Female',
    NonBinary = 'Non-Binary'  
}

export enum ActivitySchedule {
    MorningPerson = 'Morning Person',
    NightOwl = 'Night Owl',
    Flexible = 'Flexible'
}

export enum CleanlinessLevel {
    Basic = 'Basic',
    Average = 'Average',
    VeryClean = 'Very Clean'  
}

export enum CommonSpaceUsage {
    Quiet = 'Quiet',
    Moderate = 'Moderate',
    Social = 'Social'
}

export enum SocializingFrequency {
    Introvert = 'Introvert',
    Moderate = 'Moderate',
    Extrovert = 'Extrovert'
}

export enum LivingEnvironment {
    Quiet = 'Quiet',
    Lively = 'Lively',
    Flexible = 'Flexible'
}
export enum VisitFrequency {
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
    Rarely = "Rarely"
  }