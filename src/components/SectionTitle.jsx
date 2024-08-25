const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center space-y-3">
            <h3 className="text-4xl md:text-[42px] text-[#32ac6d] font-bold font-PublicSans">{heading}</h3>
            <h1 className="italic font-Pacifico text-xl md:text-2xl">{subHeading}</h1>
        </div>
    );
};

export default SectionTitle;
