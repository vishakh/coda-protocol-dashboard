/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "http://graphql.o1test.net/graphql",
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

/*const operationsDoc = `
  query MyQuery {
    version
    blocks(last: 100) {
      nodes {
        transactions {
          userCommands {
            amount
            fee
            to
            from
            isDelegation
            memo
          }
        }
      }
    }
  }
`;*/

function fetchMyQuery(operationsDoc) {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}



async function runQuery(operationsDoc) {
  const { errors, data } = await fetchMyQuery(operationsDoc);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);

  return data
}

const transactionsDoc = `
  query MyQuery {
    version
    blocks {
      nodes {
        transactions {
          userCommands {
            amount
            fee
            to
            from
            isDelegation
            memo
          }
        }
      }
    }
  }
`;

const accountDoc = `
  query MyQuery {
    account(publicKey: "PLACEHOLDER") {
      nonce
      inferredNonce
      receiptChainHash
      delegate
      votingFor
      locked
      balance {
        total
      }
    }
    blocks(last: 1) {
      nodes {
        protocolState {
          consensusState {
            totalCurrency
          }
        }
      }
    }
  }
`;

async function getTransactions() {
  return await runQuery(transactionsDoc)
}

async function getAccount(accountid) {
  return await runQuery(accountDoc.replace("PLACEHOLDER", accountid))
}