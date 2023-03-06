import { api, LightningElement } from "lwc";

export default class CaseNote extends LightningElement {
	@api note = {};

	get createdDate() {
		return new Date(this.note.CreatedDate).toLocaleString();
	}
	get createdByName() {
		return this.note?.CreatedBy?.Name;
	}
	get createdByLink() {
		return `/${this.note?.CreatedBy?.Id}`;
	}
	get date() {
		return new Date(this.note.Communication_Date__c).toLocaleString();
	}
	get result() {
		return this.note.Communication_Result__c;
	}
	get intervention() {
		return this.note.Intervention_Type__c;
	}
	get type() {
		return this.note.Type__c;
	}
	get comments() {
		return this.note.Comments__c;
	}
}
