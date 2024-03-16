import contactModel, {IContactModel} from "./contactModel";
import { IContact } from "./contact";
import { DestroyOptions } from "sequelize";

function findAll(accountId: number){
    return contactModel.findAll<IContactModel>({where: {accountId}});
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

export default { findAll, add, removeById, removeByEmail};