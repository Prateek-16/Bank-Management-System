const { Client } = require("pg");

const client = new Client({
    user: "postgres", // PostgreSQL username
    host: "localhost", // Server hosting the PostgreSQL database
    database: "Bankdb", // Your database name
    password: "admin", // Your PostgreSQL password
    port: 5432, // Default PostgreSQL port
});

client.connect((err) => {
    if (err) {
        console.log(`❌ Error In Connectivity`);
        return;
    }
    console.log(`\n ✅ Connected Successfully`);
});

const createNewAccount = ({ acId, acNm, balance }, onCreate = undefined) => {
    client.query(
        `insert into account values ($1, $2, $3)`,
        [acId, acNm, balance],
        (err, res) => {
            if (err) console.log(`\n ❌ Problem In Creating the Customer`);
            else {
                console.log(`\n ✅ New Customer Created Successfully`);
                if (onCreate) onCreate(`✅ New Customer Created Successfully`);
            }
        }
    );
};

const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
    client.query(
        `select balance from account where ac_id = $1`,
        [acId],
        (err, res) => {
            if (err) {
                console.log(`\n ❌ Problem In Withdrawing`);
            } else {
                const balance = parseFloat(res.rows[0].balance);

                const newBalance = balance - parseFloat(amount);

                console.log(`\n Your Balance: ${newBalance}`);

                if (newBalance < 0) {
                    console.log(`\n ❌ Problem In Withdrawing`);
                    return;
                } else {
                    client.query(
                        `update account set balance = $1 where ac_id = $2`,
                        [newBalance, acId],
                        (err, res) => {
                            if (err) console.log(`\n ❌ Problem In Withdrawing`);
                            else {
                                console.log(`\n ✅ Amount ${amount} Withdrawal Successfully`);
                                if (onWithdraw)
                                    onWithdraw(`✅ Amount ${amount} Withdraw Successfully`);
                            }
                        }
                    );
                }
            }
        }
    );
};

const deposit = ({ acId, amount }, onDeposit = undefined) => {
    client.query(
        `select balance from account where ac_id = $1`,
        [acId],
        (err, res) => {
            if (err) {
                console.log(`\n ❌ Problem In Deposit`);
            } else {
                const balance = parseFloat(res.rows[0].balance);
                const newBalance = balance + parseFloat(amount);

                client.query(
                    `update account set balance = $1 where ac_id = $2`,
                    [newBalance, acId],
                    (err, res) => {
                        if (err) console.log(`\n ❌ Problem In Depositing`);
                        else {
                            console.log(`\n ✅ Amount ${amount} Deposited Successfully`);

                            if (onDeposit)
                                onDeposit(`✅ Amount ${amount} Deposited Successfully`);
                        }
                    }
                );
            }
        }
    );
};

const transfer = ({ srcId, destId, amount }, onTransfer = undefined) => {
    withdraw({ acId: srcId, amount }, (msgWd) => {
        deposit({ acId: destId, amount }, (msgDp) => {
            if (onTransfer)
                onTransfer(`✅ Amount ${amount} Transferred Successfully`);
        });
    });
};

const balance = (acId, onBalance = undefined) => {
    console.log(acId);
    client.query(
        `select balance from account where ac_id = $1`,
        [acId],
        (err, res) => {
            if (err) {
                console.log(`\n ❌ Problem In Fetching the balance`);
                console.log(err);
            } else {
                const balance = parseFloat(res.rows[0].balance);
                console.log(`\n 💰 Your Account Balance Is : ${balance}`);
                if (onBalance) onBalance(balance);
            }
        }
    );
};

const customers = async (req,res) => {
        try {
          const result = await client.query('SELECT * FROM account');
          console.log(result.rows);
          res.json(result.rows);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
}
module.exports = {
    createNewAccount,
    deposit,
    withdraw,
    transfer,
    balance,
    customers,
};
