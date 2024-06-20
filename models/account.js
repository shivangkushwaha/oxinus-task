module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define(
        "Account",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: Sequelize.STRING(16),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            birthday: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            lastModified: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        },
        {
            timestamps: false,
            underscored: true,
            tableName: "accounts"
        }
    );

    Account.associate = (models) => {

    };
    
    return Account;
}