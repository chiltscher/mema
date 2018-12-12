import {MemberProps} from "./MemberProps";

export default class Member implements MemberProps {
    public $id="";
    public firstName="";
    public lastName="";
    public dateOfBirth=new Date();
    public mail="";
    public street="";
    public houseNumber="";
    public zipCode=0;
    public placeOfResidence="";
    public memberSince=new Date();
    public nameOfBank="";
    public bankAccountOwner="";
    public iban="";
    public active=true;
}