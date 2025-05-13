import React, { Children, type ReactElement, type ReactNode } from 'react';

interface ShowProps {
	children: ReactNode;
}

interface ConditionalChildProps {
	condition?: boolean;
	render?: ReactNode;
	children: ReactNode;
}

interface WhenProps {
	condition: boolean;
	children: ReactNode;
}

interface ElseProps {
	render?: ReactNode;
	children: ReactNode;
}

function Show(props: ShowProps) {
	let when: ReactElement | null = null;
	let otherwise: ReactElement | null = null;

	Children.forEach(props.children, (child: ReactNode) => {
		// Type guard to ensure child is a ReactElement with props
		if (!React.isValidElement(child)) return;

		const childElement = child as ReactElement<ConditionalChildProps>;

		if (childElement.props.condition === undefined) {
			otherwise = childElement;
		} else if (!when && childElement.props.condition === true) {
			when = childElement;
		}
	});

	return when || otherwise;
}

Show.When = ({ condition, children }: WhenProps): ReactNode =>
	condition ? children : null;
Show.Else = ({ render, children }: ElseProps): ReactNode => render || children;

export { Show };
export type { ShowProps, WhenProps, ElseProps };
