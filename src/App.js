import {useState,useEffect} from 'react'
const { ElectrumClient, ElectrumTransport } = require('electrum-cash');

function App() {
  const [test, setTest] = useState(0);
  const [electrum, setElectrum] = useState();

  useEffect(() =>{
    const connect = async () => {
      const newElectrum = new ElectrumClient(
        'Electrum client example',
        '1.4.1', 'bch.imaginary.cash',
        ElectrumTransport.WSS.Port,
        ElectrumTransport.WSS.Scheme
      );

      await newElectrum.connect();
      await new Promise(resolve => setTimeout(resolve, 1000));
      setElectrum(newElectrum);
    }
    connect()
  },[])

  useEffect(() =>{
    const getId = async () => {
      if(!electrum) return
      if(test<100){
        const transactionID = '4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251';
        const transactionHex = await electrum.request('blockchain.transaction.get', transactionID);
        console.log(test)
        setTest(test+1)
      }
    }
    getId()
  },[test, electrum])
 
  return (
    <div className="App">
      test
    </div>
  );
}

export default App;
