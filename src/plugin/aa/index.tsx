import QRCode from 'react-qr-code';

interface IProps {}
const AA: React.FC<IProps> = () => {
  console.log('dd');
  return (
    <div>
      <QRCode value="aaa" bgColor="transparent" size={224} />
      <div>aaaa</div>
    </div>
  );
};

export default AA;
