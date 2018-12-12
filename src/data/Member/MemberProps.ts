export interface MemberProps {
    $id?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    mail: string;
    street?: string;
    houseNumber?: string;
    zipCode?: number;
    placeOfResidence?: string;
    memberSince?: Date;
    nameOfBank?: string;
    bankAccountOwner?: string;
    iban?: string;
    active: boolean;
}