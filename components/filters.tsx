import { useState, useEffect } from 'react';
import { BookCheck, CalendarClock, LanguagesIcon } from 'lucide-react';
// import { usePathname } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export let appliedFilters: JSON = {} as JSON;
export const Filters = () => {
    // const [format, setFormat] = useState('');
    // const [otherContentFormat, setOtherFormatFilter] = useState('');
    const [otherSources, setOtherSources] = useState('');
    const [init_year, setInitYear] = useState(2015);
    const [end_year, setEndYear] = useState(new Date().getFullYear())

    // const [number_sources, setNumberSources] = useState(15);
    // const [numberOfCites, setNumberOfCites] = useState(3);
    const [language, setLanguage] = useState('en');

    const [selectedValues, setSelectedValues] = useState(appliedFilters);

    // const handleContentFormatChange = (e) => {
    //     setFormat(e.target.value);
    //     setOtherFormatFilter('');
    // };
    // const handleOtherFormatFilter = (e) => {
    //     setOtherFormatFilter(e.target.value);
    //     setFormat('');
    // };
    const handleOtherSrc = (e) => {
        setOtherSources(e.target.value);
        // setNumberSources(1);
    };
    const handleInitYear = (e) => {
        setInitYear(e.target.value);
    };
    const handleEndYear = (e) => {

        if (e.target.value > new Date().getFullYear()) {
            alert("The year cant't be bigger than the current year");
            setEndYear(new Date().getFullYear());
        }
        // else if(e.target.value < init_year+1){
        //     setEndYear(init_year+1);
        // }
        else {
            setEndYear(e.target.value);
        }
    };
    const handleLanguage = (e) => {
        setLanguage(e.target.value);
    }
    // const handleNumberSources = (e) => {
    //     setNumberSources(e.target.value);
    //     if (e.target.value > 1) {
    //         setOtherSources('');
    //     }
    // }
    // const handleNumberOfCites = (e) => {
    //     setNumberOfCites(e.target.value);
    // }

    useEffect(() => {
        // let format_content = [];
        // [format, otherContentFormat.trim()].map((fil) => { if (fil !== '') { format_content.push(fil) } });
        const json_filters = {
            'website': otherSources.trim(),
            'since': init_year,
            
            'until': end_year,
            'lang': language,
        };

        setSelectedValues(json_filters);
    }, [ init_year, end_year, otherSources, language]);


    appliedFilters = selectedValues;

    return (
        <div className="flex flex-col mb-4">
            <span className='text-md ml-3 mb-2'>
            Filters
            </span>

            <Accordion type="single" collapsible>
                <AccordionItem value="sources">
                    <AccordionTrigger className='mx-2 bg-[#40FBEA]/30 rounded p-2 mb-0.5'>
                        <BookCheck className='rounded bg-[#3E92FA]/50 text-[#3EFA6B] w-8 h-7 p-1' />
                        Specific Source
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex flex-col space-y-1'>
                            <label className='pl-3'>
                                <span className=" text-sm">Search in a Specific Source or Website:</span>
                            </label>
                            <input
                                    className='text-sm p-1 max-w-xs ml-3  bg-sky-950 border-2 border-cyan-900 rounded'
                                    type="text"
                                    value={otherSources}
                                    onChange={handleOtherSrc}
                                    placeholder='ex: springer.com'
                                />
                            
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="year">
                    <AccordionTrigger className='mx-2 bg-[#40FBEA]/30 rounded p-2 mb-0.5'>
                        <CalendarClock className='rounded bg-[#3E92FA]/50 text-[#3EFA6B] w-8 h-7 p-1' />
                        Year of Research
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-sm pl-3 flex flex-row justify-between ml-6'>
                                Since:
                                <input
                                    className='ml-1 bg-sky-950 border-2 border-cyan-900 rounded pr-10 pl-2 mr-3'
                                    type="number"
                                    value={init_year}
                                    onChange={handleInitYear}
                                    min="1960" max={end_year - 1} step="1"
                                />
                            </label>
                            <label className='text-sm pl-3 flex flex-row justify-between ml-6'>
                                Until:
                                <input
                                    className='ml-1 bg-sky-950 border-2 border-cyan-900 rounded pr-10 pl-2 mr-3'
                                    type="number"
                                    value={end_year}
                                    onChange={handleEndYear}
                                    min={init_year + 1}
                                    max={(new Date().getFullYear())}
                                    step="1"
                                />
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="content-format">
                    <AccordionTrigger className='mx-2 bg-[#40FBEA]/30 rounded p-2 mb-0.5'>
                        <LanguagesIcon className='rounded bg-[#3E92FA]/50 text-[#3EFA6B] w-8 h-7 p-1' />
                        Language
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex flex-col space-y-1'>
                            <div className='flex flex-row justify-between mr-6'>
                                <label htmlFor="lang" className='pl-3 text-sm'>Language: </label>
                                <select className='text-sm pl-3  bg-sky-950 border border-cyan-900 rounded' id="lang" value={language} onChange={handleLanguage}>
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                </select>
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>

    );
};