@isTest
public with sharing class CaseNotesTest {
	@isTest
	private static void getCaseNotesTest() {
		Contact c = new Contact();
		c.LastName = 'efford';
		insert c;

		List<Case_Note__c> notes = CaseNotes.getCaseNotes(c.Id);

		System.assertEquals(0, notes.size());
	}

	@isTest
	private static void createCaseNoteTest() {
		Case_Note__c note = new Case_Note__c();
		note.Comments__c = 'test';

		Case_Note__c newNote = CaseNotes.createCaseNote(note);

		System.assertEquals('test', newNote.Comments__c);
	}
}
