# Why ALEO and What is TicketWave
TicketWave is a pioneering project that seamlessly integrates with the ALEO blockchain and aligns with its core principles and goals within the ALEO Track. ALEO is designed to provide privacy and scalability, making it an ideal choice for a secure and efficient ticketing platform. TicketWave leverages ALEO's unique features to create a fraud-resistant and scalper-proof ticketing system. Our Buy Now Pay Later function and sell ticket and resell ticket uses a smart contract written in Leo Programming Language. LEO's zero-knowledge proof technology offers an exceptional level of privacy and data protection. With this feature, TicketWave can ensure that the information of buyers is hidden on the blockchain, preserving the anonymity and security of its users.

# Novelty - How unique is the application? Does it not exist on Aleo currently?
TicketWave's combination of unique features, including the escrow system, buy-now-pay-later options, anti-fraud measures, and the use of zero-knowledge proofs to protect buyers' information, positions it as a highly novel and innovative application within the ALEO ecosystem. These features not only enhance security and trust for ticket buyers and sellers but also provide a level of functionality and privacy protection that sets it apart from other ALEO-based projects.

# Engineering - How well engineered is the dApp given Aleo's current state?
The successful connection to the ALEO Wallet and the ability to make payments in your dApp indicate that TicketWave is well-engineered and functional in terms of interacting with the ALEO blockchain. 

# Functionality - What can you do with the application?
Connect to wallet and make payment

# Prerequisite
1. Download GIT, https://git-scm.com/downloads
2. Download Microsoft C++ Build Tools, https://visualstudio.microsoft.com/visual-cpp-build-tools/
3. Download Rust, https://www.rust-lang.org/tools/install
4. Download Visual Studio Code, https://code.visualstudio.com/
5. Download the source code of leo in cmd, git clone https://github.com/AleoHQ/leo then cd leo then cargo install --path .
6. Check the prerequisite with git --version, cargo --version and leo in cmd

# How to run
Run these code:
cd leo
npm install
npm run dev
Then it will show the link to the local host
Press select wallet then connect to LEO wallet, then press payment, you can get the transaction ID at the console to prove that it works.
If not enough balance then it wont show the Transaction ID
Also, you can cd into helloworld_1 then run the function there

# A description of parameters, functions
In the main.aleo file
program leo;

record Token:
    owner as address.private;
    balance as u32.private;


function mint:
    input r0 as u32.private;
    cast self.caller r0 into r1 as Token.record;
    output r1 as Token.record;


function transfer:
    input r0 as address.private;
    input r1 as u32.private;
    input r2 as Token.record;
    sub r2.balance r1 into r3;
    cast r0 r1 into r4 as Token.record;
    cast self.caller r3 into r5 as Token.record;
    output r4 as Token.record;
    output r5 as Token.record;

In the main.leo file
program helloworld_1.aleo {
    
     record Token {
        owner: address,
        balance: u32,
    }

// Will work
  transition mint(amount: u32) -> Token {
        return Token {
            owner: self.caller,
            balance: amount,
        };
    }

// We cant download SnarkOS so cant run this

transition transfer(receiver: address, transfer_amount: u32, input: Token) -> (Token, Token) {
        let sender_balance: u32 = input.balance - transfer_amount;
        let recipient: Token = Token {
            owner: receiver,
            balance: transfer_amount,
        };

        let sender: Token  = Token {
            owner: self.caller,
            balance: sender_balance
        };

        return (recipient, sender);
    }
}


# Live Video
https://youtu.be/Fiuw2Xt_ago


# Challenges Faced
Building a ticketing system is a complex endeavor that involves addressing various technical, operational, and user-related challenges. While ALEO may offer valuable features and benefits, however interpreting the whole concept into coding is the main challenges that we faced so far. Honestly speaking, this is the first time for our team to the topic of block chain and crypto or we could say this is the first time that we participate in a hackathon competition. So, during the whole process, we are all new to the language that we are offered and tried our really best to overcome in and learn it.  Besides, the server of ALEO is still under developing, so it is also quite hard for us to figure out the connection of the server whereby we keep encountering errors during our coding.so, the question is, how do we solved all this. By attending the workshop and  also communicate with the mentors,  we manage to get to know more about this language and tried to input all the knowledge that we have learnt. in the meantime, we also do a lot of research based on chatgpt and other open resourses in order to implement others features into our program



