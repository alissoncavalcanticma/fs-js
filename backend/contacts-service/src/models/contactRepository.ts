import contactModel, {IContactModel} from "./contactModel";
import { IContact } from "./contact";
import { DestroyOptions } from "sequelize";

function findAll(accountId: number){
    return contactModel.findAll<IContactModel>({where: {accountId}});
}

function findById(contactId: number, accountId: number){
    return contactModel.findOne<IContactModel>({where: {id: contactId, accountId: accountId}});
}

async function add(contact: IContact, accountId: number){
    contact.accountId = accountId;
    const result = await contactModel.create(contact);
    contact.id = result.id!;
    return contact;
}

function removeById(contactId: number, accountId: number){
    return contactModel.destroy({where:{id: contactId, accountId: accountId}}) as DestroyOptions<IContact>;
}

function removeByEmail(email: string, accountId: number){
    return contactModel.destroy({where: {email: email, accountId: accountId}}) as DestroyOptions<IContact>;
}

async function set(contactId: number, contact: IContact, accountId:number){
    const originalContact = await contactModel.findOne({where:{id: contactId, accountId: accountId}});
    if(originalContact === null) return null;

    if(contact.name) originalContact.name = contact.name;
    if(contact.phone) originalContact.phone = contact.phone;
    if(contact.status) originalContact.status = contact.status;

    const result = await originalContact.save();
    contact.id = result.id;
    return contact;
}

export default { findAll, findById, add, removeById, removeByEmail, set};