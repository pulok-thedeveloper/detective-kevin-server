import ClosedCaseCard from './ClosedCaseCard';

const ClosedCases = ({closedCases}) => {

    return (
        <div>
            <h2 className='text-5xl mb-5 font-bold'>Checkout My Recently <br/> Closed Cases</h2>
            <div className="grid justify-items-center mx-auto my-10 gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    closedCases.map(closedCase=><ClosedCaseCard key={closedCase._id} closedCase={closedCase}></ClosedCaseCard>)
                }
            </div>
        </div>
    );
};

export default ClosedCases;