import * as React from 'react';
import { css, Div, Input, Txt } from 'elmnt';
import m, { watchHover } from 'mishmash';
import { getValueString } from 'common';
import st from 'style-transform';

const Hover = m()
  .enhance(watchHover)
  .toComp();

const FileButton = m()
  .branch(({ value }) => !value, m().render())
  .style([['mergeKeys', 'button'], ['merge', { width: '100%' }]])(
  ({ value, style }) => (
    <a
      href={`${process.env.DATA_URL!}/storage/file/${value.split(':')[0]}`}
      target="_blank"
    >
      <Hover>
        {({ isHovered: hover, hoverProps }) => (
          <Txt
            {...hoverProps}
            style={st({ ...style, fontSize: 15, padding: 8 }, [
              ['mergeKeys', { hover }],
            ])}
          >
            View file
          </Txt>
        )}
      </Hover>
    </a>
  ),
);

export default m()
  .branch(
    ({ type, admin }) => type === 'file' && admin,
    m().render(({ value, style, next }) => (
      <div style={{ width: '100%' }}>
        <Div style={{ spacing: 40, layout: 'bar', width: '100%' }}>
          <div style={{ width: 150 }}>
            <FileButton value={value} style={style} />
          </div>
          {next()}
        </Div>
      </div>
    )),
  )
  .branch(
    ({ type, options, admin }) =>
      admin && !type.endsWith('list') && Array.isArray(options),
    m().map(({ options, labels, ...props }) => ({
      ...props,
      options:
        options && (!options.includes(null) ? [...options, null] : options),
      labels:
        labels &&
        (!options.includes(null) ? [...labels, '-- None --'] : labels),
    })),
  )
  .branch(
    ({ view }) => view,
    m()
      .style([['filter', ...css.groups.text]])
      .render(({ type, value, style }) => (
        <Txt style={style}>{getValueString(value, type)}</Txt>
      )),
  )(Input);
