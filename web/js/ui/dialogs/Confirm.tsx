import React from 'react';
import {Button} from 'reactstrap';
import {NullCollapse} from '../null_collapse/NullCollapse';
import {Blackout} from '../blackout/Blackout';
import {DialogContainer} from './DialogContainer';

class Styles {

    public static title: React.CSSProperties = {
        fontSize: "20px",
        fontWeight: "bold"
    };

    public static subtitle: React.CSSProperties = {
        fontSize: "16px"
    };

    public static button: React.CSSProperties = {
        fontSize: "14px"
    };

}

export class Confirm extends React.PureComponent<ConfirmProps, IState> {

    constructor(props: any) {
        super(props);

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            open: true
        };

    }

    public render() {

        return (

            <DialogContainer open={this.state.open}>

                <div className="w-100 p-1" style={Styles.title}>
                    {this.props.title}
                </div>

                <div className="w-100 p-1 text-muted" style={Styles.subtitle}>
                    {this.props.subtitle || ""}
                </div>

                <div className="text-right mt-1">

                    <Button color="secondary"
                            style={Styles.button}
                            size="sm"
                            className="m-1"
                            onClick={() => this.onCancel()}>Cancel</Button>

                    <Button color="danger"
                            style={Styles.button}
                            size="sm"
                            className="m-1"
                            onClick={() => this.onConfirm()}>Confirm</Button>

                </div>

            </DialogContainer>

        );

    }

    private onConfirm(): void {
        this.setState({open: false});
        this.props.onConfirm();
    }

    private onCancel(): void {
        this.setState({open: false});
        this.props.onCancel();
    }


}

export interface ConfirmProps {

    readonly title: string;
    readonly subtitle?: string;
    readonly onCancel: () => void;
    readonly onConfirm: () => void;
    readonly type?: 'danger';

}

export interface IState {
    readonly open: boolean;

}
