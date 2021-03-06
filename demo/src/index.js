import React, { Component } from 'react'
import { render } from 'react-dom'
import { css, injectGlobal } from 'emotion'
import CheckboxField from '@pndr/checkbox-field'
import AttachmentField from '@pndr/attachment-field'
import LongTextField from '@pndr/long-text-field'
import SingleLineTextField from '@pndr/single-line-text-field'
import SingleSelectField from '@pndr/single-select-field'
import MultipleSelectField from '@pndr/multiple-select-field'
import NumberField from '@pndr/number-field'
import LinkToAnotherRecordField from '@pndr/link-to-another-record-field'
import GridView from '../../src'
import data from './data.json'
import 'react-virtualized/styles.css'
import '../../src/styles.css'

injectGlobal`
    * {
        box-sizing: border-box;
    }
    *:focus {
        outline: 0;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    }
`

const fieldRenderer = ({ id, field, props, cell }) => {

    const renderers = {
        singleLineText: ({ props, cell }) => (
            <SingleLineTextField
                {...props}
                text={cell.text}
            />
        ),
        longText: ({ props, cell }) => (
            <LongTextField
                {...props}
                longText={cell.longText}
            />
        ),
        checkbox: ({ props, cell }) => (
            <CheckboxField
                {...props}
                checked={cell.checked}
            />
        ),
        attachment: ({ props, cell }) => (
            <AttachmentField
                {...props}
                attachments={cell.attachments}
            />
        ),
        linkToAnotherRecord: ({ props, cell }) => (
            <LinkToAnotherRecordField
                {...props}
                recordCount={cell.records.length}
                recordGetter={({ index }) => {
                    return cell.records[index]
                }}
                recordRenderer={() => null}
            />
        ),
        multipleSelect: ({ props, field, cell }) => (
            <MultipleSelectField
                {...props}
                optionIds={cell.optionIds}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        singleSelect: ({ props, field, cell }) => (
            <SingleSelectField
                {...props}
                optionId={cell.optionId}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        number: ({ props, field, cell }) => (
            <NumberField
                {...props}
                number={cell.number}
                allowNegativeNumbers={field.options.allowNegativeNumbers}
                numberFormatId={field.options.numberFormatId}
                precisionId={field.options.precisionId}
            />
        )
    }

    const renderer = renderers[field.typeId]

    if (!renderer) {
        throw new Error(`Renderer for typeId '${field.typeId}' not found`)
    }

    return renderer({
        id,
        field,
        props,
        cell
    })
}

class Demo extends Component {
    render() {

        return (
            <div
                className={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                `}
            >
                <GridView
                    rowCount={data.content.length}
                    fields={data.structure.fields}
                    rowGetter={({ index }) => data.content[index]}
                    fieldRenderer={fieldRenderer}
                    onRowClick={this.handleRowClick}
                />
            </div>
        )
    }

    handleRowClick = ({ index }) => {

        alert(`Clicked row at index ${index}`)
    }
}

render(<Demo />, document.querySelector('#demo'))
