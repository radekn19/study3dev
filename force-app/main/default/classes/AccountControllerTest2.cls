@isTest
public class AccountControllerTest2 {

    @testSetup static void setup() {
        List<Account> accounts = new List<Account>();
        accounts.add(new Account(Name='TestInactiveAccount1', Active__c='No'));
        accounts.add(new Account(Name='TestInactiveAccount2', Active__c='Yes'));
        insert accounts;
    }

    @isTest
    static void testGetAllNoActiveAccounts_Positive() {

        // Wywołanie metody do przetestowania
        List<Account> activeAccounts = AccountController.getAllNotActiveAccounts();

        // Sprawdzenie, czy metoda zwróciła poprawny wynik
        System.assertEquals(1, activeAccounts.size(), 'Nieprawidłowa liczba kont aktywnych');
        System.assertEquals('TestInactiveAccount1', activeAccounts[0].Name, 'Zwrócone złe imie');
    }


    @isTest
    static void testGetAllNoActiveAccounts_Negative() {


        // Wywołanie metody do przetestowania
        List<Account> activeAccounts = AccountController.getAllNotActiveAccounts();

        // Sprawdzenie, czy zwrócona lista jest pusta
        System.assertNotEquals(2, activeAccounts.size(), 'Lista kont aktywnych nie jest pusta, gdy nie powinna być');
    }
}