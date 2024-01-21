import { useState } from 'react'
import {Flex, Textarea} from "@chakra-ui/react";
import {sampleCode, transpileWithDefault} from "./utils/transpile";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function App() {
  const [inputCode, setInputCode] = useState('')
  const displayCode = inputCode.length === 0
      ? transpileWithDefault(sampleCode)
      : transpileWithDefault(inputCode)
  const formatted = () => {
    try {
      prettier.format(displayCode, {
        parser: "babel",
        plugins: prettierPlugins,
      });
    } catch (e) {
      return 'Syntax Error'
    }
  }
  return (
      <Flex
        flexDirection={'column'}
        height='100vh'
        p={4}
        >
        <Flex gap={4} height='70vh'>
          <Textarea w={'50%'} placeholder={sampleCode} fontSize={'lg'} height='100%' resize='none' value={inputCode} onChange={e => setInputCode( e.target.value)} />
          {/*<Textarea placeholder={transpileWithDefault(sampleCode)}  fontSize={'lg'} height='100%' resize='none' value={transpileWithDefault(inputCode)} disabled={true} />*/}
          <SyntaxHighlighter language="javascript" style={docco} customStyle={{
            width: '50%',
            height: '100%',
            overflow: 'scroll',
            lineHeight: '1.5rem',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}>
            {formatted()}
          </SyntaxHighlighter>
        </Flex>
      </Flex>
  )
}

export default App
