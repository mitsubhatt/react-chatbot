import { useEffect, useState } from "react"
import { checkHeading, replaceHeading } from "../helper";
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Answers = ({ans,totalResult, index, type}) => {

    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);
    
    useEffect(()=> {
        if(checkHeading(ans)){
            setHeading(true);
            setAnswer(replaceHeading(ans))
        }
        
    },[])

    const renderer = {
      code({node, inline, className, children, ...props}){

        const match = /language-(\w+)/.exec(className || '')
        return !inline && match? (
          <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/,'')}
          language={match[1]}
          style={dark}
          PreTag="div"
          />
        ):(
          <code {...props} className={className}> 
            {children}
          </code>
        )
      }
    }

  return (
    <>
    {
        index==0 && totalResult>1?<span className="pt-2 text-xl block dark:text-white text-zinc-800">{answer}</span>:
        heading?<span className="pt-2 text-lg block dark:text-white text-zinc-900">{answer}</span>
        :<span className={type=='q'?"":"pl-5"}>
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </span>
    }

        
    </>
  )
}

export default Answers
