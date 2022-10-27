import React, {useState} from 'react';

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
interface conversions {
    [con1: string]: {
        [conSub: string]: number,
    }
}
interface Props {
    bootstrapClass: string,
    text_color: string
}
const Table_Conversions:React.FC<Props> = ({bootstrapClass,text_color}) =>{
    let[valorConvert, setInput] = useState("")
    let[toConvert, setInput1] = useState("")
    let[numbers, setInput2] = useState("")

        const valoresSalida = (entrada1: string, entrada2: string, valor: string): string | number | undefined => {
            entrada1 = entrada1.toLowerCase().trim()
            entrada2 = entrada2.toLowerCase().trim()
            if (Number.isNaN(parseFloat(valor)) || !entrada1 || !entrada2) {
                return 0;
            }
            const salida: conversions = {
                feet: {
                    cm: parseFloat(valor) * 30.48,
                    yards: parseFloat(valor) / 3,
                    inches: parseFloat(valor) * 12
                },
                cm: {
                    feet: parseFloat(valor) / 30.48,
                    yards: parseFloat(valor) * 91.44,
                    inches: parseFloat(valor) / 2.54
                },
                inches: {
                    cm: parseFloat(valor) * 2.54,
                    yards: parseFloat(valor) / 36,
                    feet: parseFloat(valor) / 12
                },
                yards: {
                    cm: parseFloat(valor) / 91.44,
                    feet: parseFloat(valor) * 3,
                    inches: parseFloat(valor) * 36
                }
            }
            return salida[entrada1]?.[entrada2] ?? 0
        }
        return (
            <TableContainer className={bootstrapClass}>
                <Table variant='striped' className={`table text-${text_color}`}>
                    <TableCaption className='text-center text-white'>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td>
                                <div className="d-flex align-items-center">
                                    <input type="text" className='form-control mx-2'
                                        onChange={(e) => { setInput(`${e.target.value}`) }}
                                        placeholder='feet' />
                                    <span>To :</span>
                                    <input type="text" className='form-control mx-2'
                                        onChange={(e) => { setInput1(`${e.target.value}`) }}
                                        placeholder='cm' />
                                </div>
                            </Td>
                            <Td>
                                <input
                                    type="text" className='form-control'
                                    onChange={(e) => { setInput2(`${e.target.value}`) }}
                                    placeholder='15' />
                            </Td>
                            <Td className='d-flex align-items-center'>
                                <span> =</span>
                                <input type="text" className="form-control w-75" disabled
                                    value={valoresSalida(valorConvert, toConvert, numbers)}
                                    placeholder="457.2" />
                                <span className='font-weight-bold ms-2'> {toConvert}</span>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        );
}

export default Table_Conversions;