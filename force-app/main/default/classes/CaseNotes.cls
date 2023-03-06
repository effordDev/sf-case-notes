public with sharing class CaseNotes {
	@AuraEnabled
	public static List<Case_Note__c> getCaseNotes(Id contactId) {
		return [
			SELECT
				Id,
				Communication_Date__c,
				Communication_Result__c,
				Intervention_Type__c,
				Type__c,
				Comments__c,
				CreatedDate,
				CreatedBy.Name
			FROM Case_Note__c
			WHERE Related_To_Contact__c = :contactId
			ORDER BY Communication_Date__c
		];
	}

	@AuraEnabled
	public static Case_Note__c createCaseNote(Case_Note__c note) {
		insert note;
		return note;
	}
}
