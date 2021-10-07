type AbstractFactoryOptions = Record<string, any>;
type AbstractFactoryProps = Record<string, any>;

export abstract class AbstractFactory {
    abstract  execute(props: AbstractFactoryProps, options: AbstractFactoryOptions): Promise<any>;
}