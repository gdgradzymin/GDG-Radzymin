import {
  transition,
  style,
  animate,
  trigger,
  group,
  query
} from '@angular/animations';

export const routerTransitionTrigger = trigger('routerTransition', [
  transition('home => events', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('events => home', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('events => team', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('team => events', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('blog => home', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('home => blog', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('team => blog', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('blog => team', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('events => blog', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('blog => events', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ])
]);
