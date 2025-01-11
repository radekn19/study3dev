@isTest
public class AccountControllerTest {
//TestBranche
    @testSetup static void setup() {
        List<Account> accounts = new List<Account>();
        accounts.add(new Account(Name='TestInactiveAccount1', Active__c='No'));
        accounts.add(new Account(Name='TestInactiveAccount2', Active__c='Yes'));
        insert accounts;
    }
    //MyBranche
    //MyBrnache1
    //MyBrnache2
    @isTest
    static void testGetAllActiveAccounts_Positive() {

        // Wywołanie metody do przetestowania
        List<Account> activeAccounts = AccountController.getAllActiveAccounts();

        // Sprawdzenie, czy metoda zwróciła poprawny wynik
        System.assertEquals(1, activeAccounts.size(), 'Nieprawidłowa liczba kont aktywnych');
        System.assertEquals('TestInactiveAccount2', activeAccounts[0].Name, 'Zwrócone złe imie');

    }
    //TestRebaseafterMychangesCommited


    @isTest
    static void testGetAllActiveAccounts_Negative() {


        // Wywołanie metody do przetestowania
        List<Account> activeAccounts = AccountController.getAllActiveAccounts();

        // Sprawdzenie, czy zwrócona lista jest pusta
        System.assertNotEquals(2, activeAccounts.size(), 'Lista kont aktywnych nie jest pusta, gdy nie powinna być');
    }
}