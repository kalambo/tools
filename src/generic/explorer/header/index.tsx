export { default as fieldToRows } from './fieldToRows';

import * as React from 'react';
import m from 'mishmash';

import HeaderCell from './HeaderCell';

const parent = (path, depth = 1) =>
  path &&
  path
    .split('.')
    .slice(0, -depth)
    .join('.');

export default m()
  .pure()
  .branch(
    ({ live }) => live,
    m().enhance(({ firstProps, onProps, setState }) => {
      firstProps.context.store.watch(
        'header',
        (header = {}) => setState(header),
        onProps,
      );
      return (props, state) => ({ ...props, ...state });
    }),
  )(
  ({
    context,
    fieldRows,
    live,
    activeFocus,
    activeType,
    activePath,
    style,
  }) => (
    <thead>
      {fieldRows.map((row, i) => (
        <tr key={i}>
          {row.map(d => (
            <HeaderCell
              context={context}
              rowSpan={d.span ? 1 : fieldRows.length - i}
              {...d}
              {...(live
                ? {
                    live: true,
                    focused: activeFocus,
                    alt:
                      (d.path.split('.').length + (d.name === '#2' ? 1 : 0)) %
                        2 ===
                      0,
                    isPathAdd: activeType === 'add' && activePath === d.path,
                    isLastPathAdd:
                      activeType === 'add' && activePath === d.last,
                    isPathSort: activeType === 'sort' && activePath === d.path,
                    isSiblingSort:
                      activeType === 'sort' &&
                      parent(activePath) ===
                        parent(d.path, d.name === '#2' ? 2 : 1),
                    isPathRemove:
                      activeType === 'remove' && activePath === d.path,
                    isChildRemove:
                      activeType === 'remove' && d.path.startsWith(activePath),
                    isPathLimit:
                      activeType === 'limit' && activePath === d.path,
                    isPathFilter:
                      activeType === 'filter' && activePath === d.path,
                    isPathPageUp:
                      activeType === 'pageup' && activePath === d.path,
                    isPathPageDown:
                      activeType === 'pagedown' && activePath === d.path,
                  }
                : {})}
              style={style}
              key={`${d.path}_${d.name}`}
            />
          ))}
        </tr>
      ))}
    </thead>
  ),
);
