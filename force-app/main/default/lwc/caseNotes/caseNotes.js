import { api, LightningElement } from "lwc";
import getCaseNotes from "@salesforce/apex/CaseNotes.getCaseNotes";
import createCaseNote from "@salesforce/apex/CaseNotes.createCaseNote";

export default class CaseNotes extends LightningElement {
	@api recordId;

	isLoading = false;
	notes = [];

	get note() {
		return {
			Related_To_Contact__c: this.recordId,
			Communication_Date__c: this.communicationDate,
			Communication_Result__c: this.communicationResult,
			Intervention_Type__c: this.interventionType,
			Type__c: this.type,
			Comments__c: this.comments
		};
	}

	connectedCallback() {
		this.fetchNotes();
	}

	async fetchNotes() {
		try {
			this.notes = await getCaseNotes({ contactId: this.recordId });
			console.log(JSON.parse(JSON.stringify(this.notes)));
		} catch (error) {
			console.error(error);
		}
	}

	handleChange(event) {
		const field = event.target.name;
		const value = event.detail.value;

		this[field] = value;
	}

	async createNote() {
		try {
			this.isLoading = true;

			let isInputFieldCorrect = true;
			this.template
				.querySelectorAll("lightning-input-field")
				.forEach((inputField) => {
					if (!inputField.reportValidity()) {
						console.log(inputField.reportValidity());
						inputField.reportValidity();
						isInputFieldCorrect = false;
					}
				});

			if (!isInputFieldCorrect) {
				this.isLoading = false;
				return;
			}

			const note = this.note;

			await createCaseNote({ note });
			this.fetchNotes();
		} catch (error) {
			console.error(error);
		} finally {
			this.isLoading = false;

			this.communicationDate = "";
			this.communicationResult = "";
			this.interventionType = "";
			this.type = "";
			this.comments = "";
		}
	}
}
