import Link from 'next/link';
import Layout from '../components/Layout';
import Chart from '../components/Chart';

export default () => {
   return(
        <Layout>
            <h2>Homepage</h2>
            <Chart span='1d' symbol='AAPL'/>
        </Layout>
   );  
}