import { useState } from "react";
import { Flex, Textarea } from "@chakra-ui/react";
import { sampleCode, transpile } from "./utils/transpile";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ModalForm } from "./Modal";
import { defaultMapping } from "./utils/transpile";

function App() {
  const [inputCode, setInputCode] = useState("");
  const [reservedWordMapping, setReservedWordMapping] =
    useState<Record<string, string>>(defaultMapping);
  const displayCode =
    inputCode.length === 0
      ? transpile(sampleCode, reservedWordMapping)
      : transpile(inputCode, reservedWordMapping);
  const formatted = () => {
    try {
      //console.log(displayCode);
      return prettier.format(displayCode, {
        parser: "babel",
        plugins: prettierPlugins,
      });
    } catch (e) {
      //console.log(displayCode);
      return "Syntax Error";
    }
  };
  return (
    <Flex flexDirection={"column"} height="100vh" p={4} gap={4}>
      <ModalForm
        reservedWordMapping={reservedWordMapping}
        setReservedWordMapping={setReservedWordMapping}
      />
      <Flex gap={4} height="70vh">
        <Textarea
          w={"50%"}
          placeholder={sampleCode}
          fontSize={"lg"}
          height="100%"
          resize="none"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        {/*<Textarea placeholder={transpileWithDefault(sampleCode)}  fontSize={'lg'} height='100%' resize='none' value={transpileWithDefault(inputCode)} disabled={true} />*/}
        <SyntaxHighlighter
          language="javascript"
          style={docco}
          customStyle={{
            width: "50%",
            height: "100%",
            overflow: "scroll",
            lineHeight: "1.5rem",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          {formatted()}
        </SyntaxHighlighter>
      </Flex>
    </Flex>
  );
}
export default App;
